import './styles.scss';

export const Message = ({ text, myString }) => {
 
  return (
    <h3 className="header">
      Message Text, {text} {myString}
    </h3>
  );
};
