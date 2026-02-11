import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import logo from '../assets/logo.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        login(email);
        navigate('/app/loading');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-light">
            <Card className="w-full max-w-[400px] flex flex-col items-center">
                <img src={logo} alt="Vision 20" className="h-[60px] w-auto mb-6" />
                <h1 className="text-2xl font-bold text-primary mb-2 text-center">
                    Enter the email used during purchase.
                </h1>
                <p className="text-text-muted text-sm mb-6 text-center">
                    Access your Vision 20 member area.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        error={error}
                        autoFocus
                    />

                    <Button type="submit" fullWidth size="lg">
                        Continue
                    </Button>
                </form>
            </Card>
        </div>
    );
}
