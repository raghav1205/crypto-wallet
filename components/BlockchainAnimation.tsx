"use client";
import React, { useRef, useEffect } from 'react';

const Knapsack: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 400;

    // Draw the main body of the knapsack
    const drawKnapsackBody = () => {
      ctx.fillStyle = '#4A4A4A'; // Dark gray color for the knapsack
      ctx.beginPath();
      ctx.moveTo(90, 150); // Bottom left
      ctx.lineTo(210, 150); // Bottom right
      ctx.lineTo(240, 250); // Bottom right curve
      ctx.lineTo(60, 250); // Bottom left curve
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#2E2E2E'; // Darker outline
      ctx.stroke();
    };

    // Draw the flap of the knapsack
    const drawKnapsackFlap = () => {
      ctx.fillStyle = '#5B5B5B'; // Slightly lighter gray for the flap
      ctx.beginPath();
      ctx.moveTo(60, 150); // Flap left
      ctx.lineTo(240, 150); // Flap right
      ctx.lineTo(210, 80); // Flap tip right
      ctx.lineTo(90, 80); // Flap tip left
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // Draw the straps
    const drawStraps = () => {
      ctx.fillStyle = '#3D3D3D'; // Strap color
      ctx.fillRect(85, 250, 30, 100); // Left strap
      ctx.fillRect(185, 250, 30, 100); // Right strap
    };

    // Draw pockets on the knapsack
    const drawPockets = () => {
      ctx.fillStyle = '#6A6A6A'; // Pocket color
      ctx.beginPath();
      ctx.rect(120, 200, 60, 30); // Main pocket
      ctx.fill();
      ctx.strokeStyle = '#2E2E2E';
      ctx.stroke();

      // Draw a top left pocket
      ctx.beginPath();
      ctx.rect(80, 170, 50, 20);
      ctx.fill();
      ctx.stroke();

      // Draw a top right pocket
      ctx.beginPath();
      ctx.rect(170, 170, 50, 20);
      ctx.fill();
      ctx.stroke();
    };

    // Draw a zipper
    const drawZipper = () => {
      ctx.fillStyle = '#BFBFBF'; // Light gray for the zipper
      ctx.fillRect(150, 80, 10, 50); // Zipper
      ctx.strokeStyle = '#7F7F7F'; // Zipper outline
      ctx.strokeRect(150, 80, 10, 50);
    };

   

    // Draw the knapsack
    const drawKnapsack = () => {
      drawKnapsackBody();
      drawKnapsackFlap();
      drawStraps();
      drawPockets();
      drawZipper();
    };

    // Clear the canvas and draw the knapsack
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKnapsack();

  }, []);

  return <canvas ref={canvasRef} />;
};

export default Knapsack;
