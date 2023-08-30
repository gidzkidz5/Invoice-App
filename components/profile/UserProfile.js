import { useContext } from 'react';
import ProfileForm from './ProfileForm';
import styles from './UserProfile.module.css';
import { ThemeContext } from '@/ThemeContext';
import Link from 'next/link';

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
    <>
    <Link className={`backLink ff-sanserif fs-S2 ${theme}`} href={"../invoices"}>
      <div>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
      </div>
      <span>Go Back</span>
    </Link>
    <section className={`${styles.profile} ff-sanserif ${theme}`}>
      <h1 className='fs-L'>Your User Profile</h1>
      <ProfileForm 
        onChangePassword={changePasswordHandler}
      />
    </section>
    </>
  );
}

export default UserProfile;
