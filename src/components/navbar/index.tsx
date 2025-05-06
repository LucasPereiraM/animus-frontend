'use client';
import { useState } from 'react';
import Title from '../title';
import Sidebar from '../sideNavbar';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-[#FBFBFB] h-[171px] shadow-md relative overflow-hidden">
            <div className="flex flex-row justify-between items-center w-full px-4 overflow-x-hidden">
                <div className="flex ml-4 gap-4">
                    <Title
                        title="Mão Amiga"
                        onToggleSidebar={toggleSidebar}
                        textColor='text-black'
                    />
                </div>
                <div className="xs:flex xs:flex-col flex flex-row text-primary gap-2 lg:gap-5 items-center mt-5 lg:mr-14 text-sm lg:text-base whitespace-nowrap">
                    {/* 
                    <div className='flex flex-row lg:gap-5 gap-2 '>
                        <h4>Acessibilidade</h4>
                        <button>A-</button>
                        <button>A</button>
                        <button>A+</button>
                    </div>
                    
                    <button>
                        <Image
                            src="/icons/darkmode.svg"
                            alt="ativar/desativar darkmode"
                            width={19}
                            height={19}
                        />
                    </button>
                    */}
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </div>
    );
};

export default Navbar;
