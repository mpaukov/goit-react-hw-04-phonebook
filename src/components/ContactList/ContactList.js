import { ContactItem } from './ContactItem';
import s from './ContactList.module.css';

const ContactList = props => {
  return (
    <ul className={s.list}>
      {props.onFilter(props.filter).map(({ id, name, number }) => {
        return (
          <ContactItem
            contact={{ id, name, number }}
            key={id}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
