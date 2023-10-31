type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  title,
}) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-30 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg p-6 z-40">
              <div className="flex justify-between">
                <div>{title}</div>
                <button onClick={toggleModal}>
                  <i className="gg-close-o"></i>
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
