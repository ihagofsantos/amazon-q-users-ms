import { Request, Response } from 'express';
import { authMiddleware } from '../interface/http/middlewares/auth.middleware';
import { JWT } from '../infra/jwt/jwt';

// Mock JWT service
jest.mock('../infra/jwt/jwt', () => {
  return {
    JWT: jest.fn().mockImplementation(() => {
      return {
        verifyToken: jest.fn().mockImplementation((token) => {
          if (token === 'valid_token') {
            return true;
          }
          return false;
        })
      };
    })
  };
});

// Mock Express request and response
const mockRequest = (headers: any = {}) => {
  return {
    headers
  } as Request;
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext = jest.fn();

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() when a valid token is provided', () => {
    const req = mockRequest({
      authorization: 'Bearer valid_token'
    });
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error));
  });

  it('should pass error to next() when no token is provided', () => {
    const req = mockRequest();
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      message: 'No token provided'
    }));
  });

  it('should pass error to next() when token format is invalid', () => {
    const req = mockRequest({
      authorization: 'invalid_format_token'
    });
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid token format'
    }));
  });

  it('should pass error to next() when token is invalid', () => {
    const req = mockRequest({
      authorization: 'Bearer invalid_token'
    });
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid or expired token'
    }));
  });
});