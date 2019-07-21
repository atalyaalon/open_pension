<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\Core\Field\Plugin\DataType\FieldItem;
use Drupal\file\Entity\File;
use Drupal\file\FileStorage;
use Drupal\KernelTests\KernelTestBase;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LogLevel;

class OpenPensionFilesFileProcessTest extends KernelTestBase {

  /**
   * Modules to enable.
   */
  public static $modules = [
    'file',
    'user',
    'open_pension_files',
    'system',
    'media',
    'media_entity_browser',
    'media_library',
    'views',
    'image',
  ];

  /**
   * @var OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesProcess;

  /**
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installEntitySchema('file');
    $this->installEntitySchema('user');
    $this->installEntitySchema('media');
    $this->installConfig('system');
    $logger = new OpenPensionFilesLoggerChannel('testing');

    $this->openPensionFilesProcess = $this->container->get('open_pension_files.file_process');
    $this->fileSystem = $this->container->get('file_system');

    $this->openPensionFilesProcess
      ->setHttpClient($this->getMockHttpClient())
      ->setLogger($logger);
  }

  /**
   * Get an dummy object.
   *
   * @return Client
   */
  protected function getMockHttpClient(): Client {

    $mock = new MockHandler([
      new Response(200, ['X-Foo' => 'Bar']),
      new Response(
        400,
        ['Content-Type' => 'application/json'],
        json_encode(['error' => 'cannot process xlrd files.'])
      ),
    ]);

    return new Client(['handler' => HandlerStack::create($mock)]);
  }

  /**
   * Testing the log method.
   */
  public function testLog() {
    $this->openPensionFilesProcess->log('This is a logging message', LogLevel::INFO);

    $this->assertEquals(
      $this->openPensionFilesProcess->getTrackingLogs(),
      ['This is a logging message']
    );

    $this->assertEquals(
      $this->openPensionFilesProcess->getLogger()->logs,
      [['level' => LogLevel::INFO, 'message' => 'This is a logging message']]
    );
  }

  /**
   * Testing the process files method.
   */
  public function testProcessFile() {
    // Send the file for processing.
    $this->openPensionFilesProcess->processFile(1);

    $this->assertEquals(
      $this->openPensionFilesProcess->getLogger()->logs,
      [['level' => LogLevel::INFO, 'message' => 'Could not load a file with the ID 1']]
    );

    // Replace the file service with a dummy service.
    /** @var MockObject|FileStorage $file_mock */
    $file_mock = $this
      ->getMockBuilder(FileStorage::class)
      ->disableOriginalConstructor()
      ->getMock();

    $file_mock
      ->method('load')
      ->willReturn(File::create(['bundle' => 'foo', 'filename' => 'foo']));

    // Process the file again.
    $this
      ->openPensionFilesProcess
      ->setFileStorage($file_mock)
      ->processFile(1);

    $this->assertTrue(
      $this->openPensionFilesProcess->getLogger()->logs,
      ['level' => LogLevel::INFO, 'message' => 'Starting to process the file foo']
    );

    $this->assertTrue(
      $this->openPensionFilesProcess->getLogger()->logs,
      ['level' => LogLevel::INFO, 'message' => 'The file foo has been processed']
    );

    // Now, apply the request again and look for the erros in the log.
    $this
      ->openPensionFilesProcess
      ->setFileStorage($file_mock)
      ->processFile(1);

    $error = $this->openPensionFilesProcess->getLogger()->logs;

    $message = "The file foo was not able to process due to Client error: `GET http://google.com` resulted in a `400 Bad Request` response:";
    $message .= "\n{&quot;error&quot;:&quot;cannot process xlrd files.&quot;}\n";

    $this->assertEquals($error[4]['level'], LogLevel::ERROR);
    $this->assertEquals($error[4]['message'], $message);
  }

}
