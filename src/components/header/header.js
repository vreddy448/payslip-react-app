import React from 'react';
import headerStyles from '../../css/header.css';

export default class Header extends React.Component {

    render() {
        return(
            <div>
                <nav className={headerStyles.nav_bar}>
                    <ul className={headerStyles.nav_left}>
                        <li>
                            Payslip Generator
                        </li>
                    </ul>
                    <ul className={headerStyles.nav_right}>
                        <li>
                            <span>Created by &nbsp;&nbsp;
                                <a href="https://www.linkedin.com/in/venkata-sanikommu/" target="_blank" rel='noopener noreferrer'>
                                    Venkata Reddy
                                </a>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}