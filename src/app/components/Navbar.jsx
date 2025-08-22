import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <ul className='flex justify-center items-center gap-6'>
                <Link href="/">
                    <li>
                        Home
                    </li>
                </Link>
                <Link href="/products">
                    <li>
                        Products
                    </li>
                </Link>

                <Link href="/login">
                    <li>
                        Login
                    </li>
                </Link>

            </ul>
        </nav>
    );
};

export default Navbar;