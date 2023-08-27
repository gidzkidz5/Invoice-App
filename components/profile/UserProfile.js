import { useContext } from 'react';
import ProfileForm from './ProfileForm';
import styles from './UserProfile.module.css';
import { ThemeContext } from '@/ThemeContext';

function UserProfile() {
  

  async function changePasswordHandler(passwordData) {
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${styles.profile} ff-sanserif ${theme}`}>
      <h1 className='fs-L'>Your User Profile</h1>
      <ProfileForm 
        onChangePassword={changePasswordHandler}
      />
    </section>
  );
}

export default UserProfile;
