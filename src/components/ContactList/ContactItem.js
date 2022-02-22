import s from './ContactList.module.css';

const ContactItem = props => {
  const { id, name, number } = props.contact;
  return (
    <li className={s.list__item}>
      <p className={s.text}>{name}</p>
      <p className={s.text}>{number}</p>
      <button
        className={s.button}
        type="button"
        id={id}
        onClick={props.onDelete}
      >
        Delete
      </button>
    </li>
  );
};

export { ContactItem };
