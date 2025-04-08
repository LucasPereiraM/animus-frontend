type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] max-h-[80%] overflow-y-auto">
                <button className="mb-4 float-right" onClick={onClose}>Fechar</button>
                {children}
            </div>
        </div>
    );
}
