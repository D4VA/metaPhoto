import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";

export default function ModalInfoComponent(item) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderObject = (obj) => {
    return (
      <div>
        {Object.entries(obj).map(([key, value]) => (
          <div key={key}>
            {typeof value === 'object' ? (
              <div>
                <strong>{key}</strong>
                {renderObject(value)}
              </div>
            ) : (
              <div>{`${key}: ${value}`}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Album Information</ModalHeader>
              <ModalBody>
              <div>
                <div><strong>Photo Information</strong></div>
                  {Object.entries(item).map(([key, value]) => (
                    <div
                      key={key}
                      className={'ml-2'}
                    >
                      {typeof value === 'object' ? (
                        renderObject(value)
                      ) : (
                        <div
                        className={'ml-4'}
                        >
                          {`${key}: ${value}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>      
      </Modal>
    </>
  );
}
