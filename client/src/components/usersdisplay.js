import React from 'react';
import { differenceInYears } from 'date-fns';
import '../styles/components/_usersdisplay.scss';

function Usersdisplay(props) {
    const { users } = props;

    // diviser les utilisateurs en groupes de 8
    const groupes = [];
    for (let i = 0; i < users.length; i += 8) {
      groupes.push(users.slice(i, i + 8));
    }
  
    return (
      <div>
        <div className="8group_display" style={{ justifyContent: 'center'}}>
          {groupes.map((groupe, index) => (
            <div key={index} className="groupe8_block">
              {groupe.map((user) => (
                <div className='container_image_details_users' key={user.id} style={{ border: 'solid blue 1px' }}>
                  <img className="user_image_home" src={user.ppicture} alt={user.name} />
                  <div className='users_details'>
                    <p>{user.name} {user.firstname}</p>
                    <p>{differenceInYears(new Date() ,new Date(user.dob))}</p>
                    <p>{user.orientation}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Usersdisplay;