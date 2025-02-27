import Title from "../title";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="bg-grey h-[171px]">
            <div className="flex flex-row justify-between">
                <Title title="Mão Amiga" />
                <div className="flex flex-row text-primary gap-5 h-5 mt-5 mr-14">
                    <h4>Acessibilidade</h4>
                    <button>
                        A-
                    </button>
                    <button>
                        A
                    </button>
                    <button>
                        A+
                    </button>
                    <button>
                        <Image
                            src="/icons/darkmode.svg"
                            alt="ativar/desativar darkmode"
                            width={19}
                            height={19}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;