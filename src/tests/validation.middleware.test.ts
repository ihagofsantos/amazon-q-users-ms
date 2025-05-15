import { Request, Response } from 'express';
import { ValidationMiddleware } from '../interface/http/middlewares/validation.middleware';

// Mock Express request and response
const mockRequest = (body: any) => {
  return {
    body
  } as Request;
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext = jest.fn();

describe('ValidationMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateCreateUser', () => {
    it('should pass validation with valid data', async () => {
      const req = mockRequest({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateCreateUser) {
        await middleware(req, res, mockNext);
      }

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail validation with name too short', async () => {
      const req = mockRequest({
        name: 'John', // Less than 5 characters
        email: 'john@example.com',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateCreateUser) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail validation with missing email', async () => {
      const req = mockRequest({
        name: 'John Doe',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateCreateUser) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail validation with invalid email', async () => {
      const req = mockRequest({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateCreateUser) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateLogin', () => {
    it('should pass validation with valid data', async () => {
      const req = mockRequest({
        email: 'john@example.com',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateLogin) {
        await middleware(req, res, mockNext);
      }

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail validation with missing email', async () => {
      const req = mockRequest({
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateLogin) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail validation with invalid email', async () => {
      const req = mockRequest({
        email: 'invalid-email',
        password: 'password123'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateLogin) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should fail validation with missing password', async () => {
      const req = mockRequest({
        email: 'john@example.com'
      });
      const res = mockResponse();

      // Execute all middleware functions in the array
      for (const middleware of ValidationMiddleware.validateLogin) {
        await middleware(req, res, mockNext);
        if (res.status.mock.calls.length > 0) break; // Stop if validation failed
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});