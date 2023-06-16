// @ts-check
import { test, expect } from '@playwright/test';
import axios from 'axios';

test('Analysis text to sense', async ({ page }) => {
  const url = 'http://localhost:8080/sense';
  const text = 'Analysis text to sense';

  const response = await axios.post(url, { text }, {
    headers: { 'Content-Type': 'application/json' }
  });
  expect(response.status).toBe(200);
  const data = response.data;
  expect(data).toBeInstanceOf(Object);

});
