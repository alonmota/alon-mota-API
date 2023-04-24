const express = require('express');
const request = require('supertest');
const axios = require('axios');
const clinicEndpoints = require('./clinics.routes.js');
const { mockApi1, mockApi2 } = require('./clinics.mocks.js');
const states = require('../../utils/states.js');

jest.mock('axios');
axios.get = jest.fn();

// Set up app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/clinics', clinicEndpoints);

describe('Clinics endpoints', () => {
	describe('GET /api/clinics', () => {
		describe('Api behavior', () => {
			beforeEach(() => {
				jest.resetAllMocks();
			});
			test('Returns 503 if all apis are unavailable', async () => {
				axios.get.mockRejectedValue(new Error('Error'));
				const res = await request(app).get('/api/clinics');
				expect(res.statusCode).toEqual(503);
			});
			test('Returns list of clinics if at least one clinic is available available', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockRejectedValueOnce(new Error('Error'));
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const res = await request(app).get('/api/clinics');
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(2);
			});
			test('Returns an array for all available providers', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const res = await request(app).get('/api/clinics');
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(4);
			});
		});
		describe('Filter for name', () => {
			test('Return only documents that match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchName = 'Mayo';
				const res = await request(app).get(`/api/clinics?name=${searchName}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body.every((x) => x.name.includes(searchName))).toBe(true);
			});
			test('Return empty array if no documents match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchName = 'Randon12334';
				const res = await request(app).get(`/api/clinics?name=${searchName}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(0);
			});
		});
		describe('Filter for state', () => {
			test('Return only documents that match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchState = 'CA';
				const res = await request(app).get(`/api/clinics?state=${searchState}`);
				expect(res.statusCode).toEqual(200);
				expect(
					res.body.every((x) => (x.state === searchState || x.state === states[searchState])),
				).toBe(true);
			});
			test('Return empty array if no documents match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchState = 'Congo';
				const res = await request(app).get(`/api/clinics?state=${searchState}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(0);
			});
		});
		describe('Filter for availability', () => {
			test('Return only documents that match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchAvailability = '09:40';
				const res = await request(app).get(`/api/clinics?availability=${searchAvailability}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body.every((x) => x.availability.from <= '09:40' && x.availability.to >= '09:40')).toBe(true);
			});
			test('Return only documents that match the filter with interval', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchAvailability = 'from:09:40, to:10:00';
				const res = await request(app).get(`/api/clinics?availability=${searchAvailability}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body.every((x) => x.availability.from <= '09:40' && x.availability.to >= '10:00')).toBe(true);
			});
			test('Invalid interval should throw BadRequest', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchAvailability = 'from:10:40, to:09:00';
				const res = await request(app).get(`/api/clinics?availability=${searchAvailability}`);
				expect(res.statusCode).toEqual(400);
			});
			test('Return empty array if no documents match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const searchAvailability = '23:50';
				const res = await request(app).get(`/api/clinics?availability=${searchAvailability}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(0);
			});
		});
		describe('Filter combination', () => {
			test('Return only documents that match the filter', async () => {
				axios.get.mockReturnValueOnce({ data: mockApi1 });
				axios.get.mockReturnValueOnce({ data: mockApi2 });
				axios.get.mockRejectedValue(new Error('Error')); // In case there are more apis in the config, ignore
				const res = await request(app).get('/api/clinics?name=Good&availability=16%3A40');
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveLength(2);
			});
		});
	});
});
