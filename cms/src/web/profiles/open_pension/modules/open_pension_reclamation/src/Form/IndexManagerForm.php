<?php

namespace Drupal\open_pension_reclamation\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the index manager entity edit forms.
 */
class IndexManagerForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {

    $entity = $this->getEntity();
    $result = $entity->save();
    $link = $entity->toLink($this->t('View'))->toRenderable();

    $message_arguments = ['%label' => $this->entity->label()];
    $logger_arguments = $message_arguments + ['link' => render($link)];

    if ($result == SAVED_NEW) {
      $this->messenger()->addStatus($this->t('New index manager %label has been created.', $message_arguments));
      $this->logger('open_pension_reclamation')->notice('Created new index manager %label', $logger_arguments);
    }
    else {
      $this->messenger()->addStatus($this->t('The index manager %label has been updated.', $message_arguments));
      $this->logger('open_pension_reclamation')->notice('Updated new index manager %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.index_manager.canonical', ['index_manager' => $entity->id()]);
  }

}
