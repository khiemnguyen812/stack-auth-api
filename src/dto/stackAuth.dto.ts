import { IsString, MinLength, IsEmail, IsBase64, IsBoolean, IsObject, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class signUpEmailPassswordDto {
    @ApiProperty({ description: 'User email address', example: 'nkhiem183@gmail.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'User password', example: 'password123' })
    @IsString()
    @MinLength(8, { message: 'Password is too short' })
    password: string;

    @ApiProperty({ description: 'Verification callback URL', example: 'http://localhost:3000/verify' })
    @IsString()
    verificationCallbackUrl: string;
}

export class signInEmailPassswordDto {
    @ApiProperty({ description: 'User email address', example: 'nkhiem183@gmail.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'User password', example: 'password123' })
    @IsString()
    password: string;
}

export class sendResetPasswordCodeDto {
    @ApiProperty({ description: 'User email address', example: 'nkhiem183@gmail.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'Callback URL', example: 'http://localhost:3000/reset' })
    @IsString()
    callback_url: string;
}

export class resetPasswordWithCodeDto {
    @ApiProperty({ description: 'New password', example: 'newpassword123' })
    @IsString()
    @MinLength(8, { message: 'Password is too short' })
    password: string;

    @ApiProperty({ description: 'Reset code', example: '1qfdven7x8s06b9m0156ewrqqx5hjcndp49j4s3zvtz30' })
    @IsString()
    code: string;
}

export class sendSignInCodeDto {
    @ApiProperty({ description: 'User email address', example: 'nkhiem183@gmail.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ description: 'Callback URL', example: 'http://localhost:3000/signin' })
    @IsString()
    callback_url: string;
}

export class signInWithCodeDto {
    @IsString()
    @ApiProperty({ description: 'Code for sign-in', example: 'bwdgf4tsttw9xax1k37anqrcnapqxkjhga0hhybgwfbz8' })
    code: string;
}


export class updateUserDto {
    @ApiPropertyOptional({
        description: 'Human-readable user display name. This is not a unique identifier.',
        example: 'John Doe'
    })
    @IsOptional()
    @IsString()
    display_name?: string;

    @ApiPropertyOptional({
        description: 'URL of the profile image for user. Can be a Base64 encoded image. Must be smaller than 100KB.',
        example: 'https://example.com/profile.jpg'
    })
    @IsOptional()
    @IsString()
    profile_image_url?: string;

    @ApiPropertyOptional({
        description: 'Client metadata. Used as a data store, accessible from the client side.',
        example: { theme: 'dark', language: 'en' }
    })
    @IsOptional()
    @IsObject()
    client_metadata?: Record<string, any>;

    @ApiPropertyOptional({
        description: 'Client read-only, server-writable metadata. Used as a data store, accessible from the client side.',
        example: { lastLogin: '2023-10-01T12:34:56Z' }
    })
    @IsOptional()
    @IsObject()
    client_read_only_metadata?: Record<string, any>;

    @ApiPropertyOptional({
        description: 'Server metadata. Used as a data store, only accessible from the server side.',
        example: { internalId: 'abc123' }
    })
    @IsOptional()
    @IsObject()
    server_metadata?: Record<string, any>;


    @ApiPropertyOptional({
        description: 'Whether the primary email has been verified to belong to this user',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    primary_email_verified?: boolean;

    @ApiPropertyOptional({
        description: 'Whether the primary email can be used to sign into this user\'s account',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    primary_email_auth_enabled?: boolean;

    @ApiPropertyOptional({
        description: 'A new password for the user, overwriting the old one (if it exists). Specifying this option revokes all current sessions.',
        example: 'newSecurePassword123'
    })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({
        description: 'A TOTP secret for the user, overwriting the old one (if it exists). Set to null to disable 2FA.',
        example: 'c2VjcmV0VG9UUFNlY3JldA=='
    })
    @IsOptional()
    @IsBase64()
    totp_secret_base64?: string;

    
    @IsOptional()
    @IsString()
    selected_team_id?: string;
}

export class sendEmailVerificationCodeDto{
    @ApiProperty({ description: 'User email address', example: 'nkhiem183@gmail.com'})
    @IsEmail({}, {message: 'Invalid email address'})
    email: string;

    @ApiProperty({ description: 'Callback URL', example: 'http://localhost:3000/verify'})
    @IsString()
    callback_url: string;
}