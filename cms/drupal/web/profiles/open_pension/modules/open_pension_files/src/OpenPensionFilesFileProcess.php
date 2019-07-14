<?php

namespace Drupal\open_pension_files;

use Drupal\Core\Logger\LoggerChannel;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use GuzzleHttp\ClientInterface;

/**
 * Class OpenPensionFilesFileProcess.
 */
class OpenPensionFilesFileProcess implements OpenPensionFilesProcessInterface
{

    /**
     * GuzzleHttp\ClientInterface definition.
     *
     * @var ClientInterface
     */
    protected $httpClient;

    /**
     * @var LoggerChannel
     */
    protected $logger;

    /**
     * @var \Drupal\Core\Entity\EntityStorageInterface
     */
    protected $fileStorage;

    /**
     * @var string[]
     */
    protected $trackingLogs = [];

    /**
     * @var bool
     */
    protected $processed = FALSE;

    /**
     * Constructs a new OpenPensionFilesFileProcess object.
     *
     * @param ClientInterface $http_client
     * @param LoggerChannel $logger
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
     *
     * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
     * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
     */
    public function __construct(ClientInterface $http_client, LoggerChannel $logger, \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager) {
        $this->httpClient = $http_client;
        $this->logger = $logger;
        $this->fileStorage = $entity_manager->getStorage('file');
    }

    /**
     * @return ClientInterface
     */
    public function getHttpClient(): ClientInterface {
        return $this->httpClient;
    }

    /**
     * @param ClientInterface $httpClient
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setHttpClient(ClientInterface $httpClient): OpenPensionFilesProcessInterface {
        $this->httpClient = $httpClient;
        return $this;
    }

    /**
     * @return LoggerChannel
     */
    public function getLogger(): LoggerChannel {
        return $this->logger;
    }

    /**
     * @param LoggerChannel $logger
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setLogger(LoggerChannel $logger): OpenPensionFilesProcessInterface {
        $this->logger = $logger;

        return $this;
    }

    /**
     * @return \Drupal\Core\Entity\EntityStorageInterface
     */
    public function getFileStorage(): \Drupal\Core\Entity\EntityStorageInterface {
        return $this->fileStorage;
    }

    /**
     * @param \Drupal\Core\Entity\EntityStorageInterface $fileStorage
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setFileStorage(\Drupal\Core\Entity\EntityStorageInterface $fileStorage): OpenPensionFilesProcessInterface {
        $this->fileStorage = $fileStorage;

        return $this;
    }

    /**
     * @return string[]
     */
    public function getTrackingLogs(): array {
        return $this->trackingLogs;
    }

    /**
     * @param string[] $trackingLogs
     *
     * @return OpenPensionFilesFileProcess
     */
    public function setTrackingLogs(array $trackingLogs): OpenPensionFilesProcessInterface {
        $this->trackingLogs = $trackingLogs;

        return $this;
    }

    /**
     * Logging what happens - to the watchdog and to the logs property.
     *
     * @param string $log
     *  The message to log.
     * @param string $status
     *  A logger level.
     *
     * @return $this
     */
    public function log(string $log, string $status = 'info'): OpenPensionFilesProcessInterface {
        $this->trackingLogs[] = $log;
        $this->logger->log($status, $log);
        return $this;
    }

    /**
     * Processing a file.
     *
     * @param $file_id
     *  The file ID.
     *
     * @return self
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function processFile($file_id): OpenPensionFilesProcessInterface {
        /** @var File $file */
        $file = $this->fileStorage->load($file_id);

        if (!$file) {
            $this->log(t('Could not load a file with the ID @id', ['@id' => $file_id]));
            $this->processed = FALSE;
            return $this;
        }

        $this->log(t('Starting to process the file @file_name', ['@file_name' => $file->getFilename()]));

        $results = $this->httpClient->request('get', 'http://google.com');

        if ($results->getStatusCode() == 200) {
            $this->log(t('The file @file-name has been processed', ['@file-name' => $file->getFilename()]));
            $this->processed = TRUE;
            return $this;
        }

        $this->log(t('The file @file-name was not able to process', ['@file-name' => $file->getFilename()]), 'error');
        $this->processed = FALSE;
        return $this;
    }

    /**
     * Updating the media entity which holds the file refrence.
     *
     * @param Media $media
     *  The file object.
     *
     * @throws \Drupal\Core\Entity\EntityStorageException
     */
    public function updateEntity(Media $media) {
        $media->field_processed = $this->processed;

        // Add the history to the file.
        foreach ($this->getTrackingLogs() as $log) {
            $media->field_history->appendItem($log);
        }

        // Saving file.
        $media->save();
    }

}
