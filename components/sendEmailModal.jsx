import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Input,
    ModalContent,
    Popover, PopoverTrigger, PopoverContent,
} from "@nextui-org/react";

export default function SendEmailModal({ isOpen, onOpenChange, onClose, id }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = async () => {
        if (!email || !id) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://3.145.53.73:8004/api/Util/SendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    produtoId: id,
                }),
            });

            setEmail("");
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);

        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            setEmail("");
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal style={{ maxHeight: '99vh', overflowY: 'auto' }} size={"1xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            {isSuccess && (
                                <Popover isOpen={isSuccess} position="top-end" color="success">
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">E-mail enviado com sucesso!</div>
                                            <div className="text-tiny">O e-mail foi enviado com sucesso.</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                            <h3 className="text-black text-lg font-semibold mb-4">Enviar E-mail</h3>
                            <div className="flex flex-col gap-4">
                                <Input
                                    label="E-mail"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Digite o endereço de e-mail"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button auto onClick={onClose} disabled={isLoading}>Cancelar</Button>
                            <Button auto variant="solid" color="success" onClick={handleSubmit} loading={isLoading}>{isLoading ? "Enviando" : "Enviar E-mail"}</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    );
}
