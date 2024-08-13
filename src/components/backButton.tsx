'use client'

import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();  // Navigate to the previous page in history
  };

  return (
    <Button
      type="primary"
      icon={<LeftOutlined />}
      onClick={handleBack}
      style={{
        backgroundColor: '#ff4d4f',
        borderColor: '#ff4d4f',
        color: '#fff',
        fontFamily: 'Press Start 2P, cursive',
        fontSize: '14px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000',
        borderRadius: '10px',
        boxShadow: '0 4px 0 #d9363e',
        padding: '10px 20px',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(4px)';
        e.currentTarget.style.boxShadow = '0 2px 0 #d9363e';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 0 #d9363e';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 0 #d9363e';
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
