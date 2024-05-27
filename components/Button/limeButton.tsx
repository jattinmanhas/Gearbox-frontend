"use client";
import React from 'react'
import styles from './limeButton.module.css';
import { limeButton } from '@/types/buttonTypes';
import { useFormStatus } from 'react-dom';

const LimeButton: React.FC<limeButton> = ({name, type}) => {
  const { pending } = useFormStatus()

  return (
    <div className={styles.limeButtonContainer}>
        <button className={styles.limeButton} type={type} disabled={pending}>
           {pending ? "Submitting..." :  name }
        </button>
    </div>
  )
}

export default LimeButton