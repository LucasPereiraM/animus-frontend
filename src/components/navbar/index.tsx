'use client';
import { useState } from 'react';
import Title from '../title';
import Sidebar from '../sideNavbar';
import Image from 'next/image';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-[#FBFBFB] h-[171px] shadow-md">
            <div className="flex flex-row justify-between">
                <div className='ml-40'>
                    <Title title="Mão Amiga" onToggleSidebar={toggleSidebar} />
                </div>
                <div className="flex flex-row text-primary gap-5 h-5 mt-5 mr-14">
                    <h4>Acessibilidade</h4>
                    <button>A-</button>
                    <button>A</button>
                    <button>A+</button>
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

            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </div>
    );
};

export default Navbar;
