import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCardButton.module.css';
import CardContext from '../../store/cart-context';

const HeaderCardButton = (props) => {

    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const cartContext = useContext(CardContext);

    const {items} = cartContext;

    const numberOfCartItems = items.reduce((currNum, item) => 
    {
        return currNum + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${btnHighlighted ? styles.bump : ''}`;

    const onClickHandler = () => {
        props.onCartClick();
    }

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={onClickHandler}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span >
        </button>
    );
}

export default HeaderCardButton;