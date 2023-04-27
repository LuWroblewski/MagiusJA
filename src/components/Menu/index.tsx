import style from './style.module.css';
import logo from '../../img/magius.png';
import Image from 'next/image';
import Link from 'next/link';

export const Menu = () => (
  <section className={style.menu}>
    <Link className={style.ulLink} href='/'>
      <Image className={style.img} src={logo} alt='imageMenu' />
    </Link>

    <ul className={style.ulMenu}>
      <Link className={style.ulLink} href='/'>
        <li>Cadastrar</li>
      </Link>
      <Link className={style.ulLink} href='/configQuestion'>
        <li>configurações</li>
      </Link>
      <Link className={style.ulLink} href='/indicators'>
        <li>Indicadores</li>
      </Link>
    </ul>
  </section>
);
