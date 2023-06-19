// @ts-check
import { test, expect } from '@playwright/test';
import axios from 'axios';
import fs from 'fs';

test('Analysis text to sense', async ({ page }) => {
  const url = 'http://localhost:8080/sense';
  const text = 'Analysis text to sense';

  const response = await axios.post(url, { text }, {
    headers: { 'Content-Type': 'application/json' }
  });
  expect(response.status).toBe(200);
  const data = response.data.sentiment;
  expect(typeof data).toBe('string');

  // Save test result
  fs.writeFileSync('test-results/analysis-sense.json', JSON.stringify(response.data));
});

test('Analysis text to summary', async ({ page }) => {
  const url = 'http://localhost:8080/summary';
  const text = 'Superman';

  const response = await axios.post(url, { text }, {
    headers: { 'Content-Type': 'application/json' }
  });
  expect(response.status).toBe(200);
  const data = response.data.text;
  expect(typeof data).toBe('string');

  // Save test result
  fs.writeFileSync('test-results/analysis-summary.json', JSON.stringify(response.data));
});
