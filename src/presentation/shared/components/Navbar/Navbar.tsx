import Link from 'next/link';
import Image from 'next/image';
import Avatar from '../Avatar/Avatar';
import logoIcon from '@/ressources/images/logo.svg';
import {getCurrentUser} from "@/domain/shared/lib/auth";
import Button from "@/presentation/shared/components/Button/Button";

const Navbar = async () => {
    const user = await getCurrentUser();
    console.log('user',user);
    return (
        <nav className='shadow-sm'>
            <div className='flex items-center justify-between mx-auto p-5 sm:px-10 container'>
                <Link href='/'>
                    <Image src={logoIcon} alt='logo' width={25} />
                </Link>
                <div className='flex space-x-8 items-center'>
                    {user ? (
                        <Avatar />
                    ) : (
                        <>
                            <Link href='/auth/login' className='text-primary-900'>
                                Login
                            </Link>
                            <Link href='/auth/register'>
                                <Button type='primary' text='Get started' />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
