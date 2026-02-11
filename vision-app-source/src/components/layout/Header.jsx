import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import logo from '../../assets/logo.png';

export function Header() {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);
    const user = useStore((state) => state.user);

    const handleLogout = () => {
        logout();
        navigate('/app');
    };

    if (!user) return null;

    return (
        <header className="fixed top-0 left-0 right-0 h-[60px] bg-primary flex items-center justify-between px-6 z-50 shadow-md">
            <div className="flex items-center">
                <img src={logo} alt="Vision 20" className="h-[40px] w-auto" />
            </div>
            <button
                onClick={handleLogout}
                className="text-white hover:text-accent transition-colors p-2"
                aria-label="Exit"
            >
                <LogOut size={20} />
            </button>
        </header>
    );
}
