import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ValidationErrorDetail {
  @ApiProperty({
    description: 'The property that failed validation',
    example: 'username',
  })
  property: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'Validation constraints with error messages',
    example: { isNotEmpty: 'username should not be empty' },
  })
  errors: Record<string, string>;
}

export class StandardErrorResponse {
  @ApiProperty({
    description: 'HTTP status code of the error',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    format: 'date-time',
    description: 'Timestamp in ISO 8601 format when the error occurred',
    example: '2025-04-27T16:37:48.011Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'The path of the request that caused the error',
    example: '/api/v1/users',
  })
  path: string;

  @ApiProperty({
    description: 'HTTP method of the request',
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  })
  method: string;

  @ApiProperty({
    description: 'The name of the error',
    example: 'BadRequestException',
  })
  errorName: string;

  @ApiProperty({
    description: 'Error message or validation details',
    oneOf: [
      { type: 'string', example: 'Invalid input data' },
      {
        type: 'array',
        items: { $ref: getSchemaPath(ValidationErrorDetail) },
        example: [
          {
            property: 'username',
            errors: { isNotEmpty: 'username should not be empty' },
          },
        ],
      },
    ],
  })
  message: string | ValidationErrorDetail[];
}
