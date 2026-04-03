import React from 'react';
import Modal from '../common/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = React.useState(initialMode);

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <div className={styles.authModal}>
        <div className={styles.header}>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to continue' : 'Join Origin Foods today'}</p>
        </div>
        
        {mode === 'login' ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={onClose} />
        )}
        
        <div className={styles.footer}>
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={handleSwitchMode} className={styles.switchBtn}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;