import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';
import ModalWrapper from './ModalWrapper';

interface UrgentAlertProps {
  isOpen: boolean;
  onAcknowledge: () => void;
  title: string;
  message: string;
}

const UrgentAlert: React.FC<UrgentAlertProps> = ({ isOpen, onAcknowledge, title, message }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onAcknowledge}
      title="Urgent Announcement"
      role="alertdialog"
      hideCloseButton={true}
      className="max-w-lg border-t-4 border-warning-msg"
    >
      <div className="p-0" data-story-code="2.09.g">
        <div className="bg-warning-msg p-4 flex items-center gap-3">
          <AlertTriangle className="text-white" size={24} aria-hidden="true" />
          <h2 className="text-white font-fraunces text-xl font-semibold">Urgent Announcement</h2>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-primary-text mb-2">{title}</h3>
          <p className="text-secondary-text mb-6 leading-relaxed">
            {message}
          </p>
          <div className="flex justify-end">
            <Button onClick={onAcknowledge} variant="primary" autoFocus>
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UrgentAlert;