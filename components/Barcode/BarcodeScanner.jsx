'use client';
import { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader'], // Specify the barcode types you want to scan
        },
      },
      (err) => {
        if (err) {
          console.error('Failed to initialize Quagga:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      console.log('Barcode detected:', data.codeResult.code);
      // Handle the detected barcode here
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="barcode-scanner" ref={videoRef}>
      <h1>Hello</h1>
  </div>
  );
};

export default BarcodeScanner;
