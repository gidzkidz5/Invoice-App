import { ThemeContext } from '@/ThemeContext';
import styles from './ProfileForm.module.css';
import { useContext, useRef } from 'react';

function ProfileForm(props) {

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    //optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }

  const { theme } = useContext(ThemeContext);


  return (
    <form className={`${styles.form} ff-sanserif`} onSubmit={submitHandler}>
      <div className={`${styles.control} ${theme}`}>
        <label htmlFor='new-password'>Old Password</label>
        <input className={`fs-M`} type='password' id='new-password' ref={oldPasswordRef} />
      </div>
      <div className={`${styles.control} ${theme}`}>
        <label htmlFor='old-password'>New Password</label>
        <input className={`fs-M`} type='password' id='old-password' ref={newPasswordRef}/>
      </div>
      <div className={`${styles.action} ${theme}`}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
