import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from 'express';
import { StackAuthService } from "./stackAuth.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage } from "src/global/gobal.Enum";
import { signUpEmailPassswordDto, signInEmailPassswordDto, sendResetPasswordCodeDto, resetPasswordWithCodeDto, sendSignInCodeDto, signInWithCodeDto, updateUserDto, sendEmailVerificationCodeDto } from "src/dto/stackAuth.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@Controller("stackAuth")
export class StackAuthController {
    constructor(private stackAuthService: StackAuthService) { }

    @ApiTags('SignIn and SignUp')
    @Post('/signUpEmailPasssword')
    @ApiOperation({ summary: 'Sign up with email and password' })
    @ApiResponse({
        status: 201,
        description: 'User successfully signed up',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "access_token": "eyJhbGciOiJFUzI1NiJ9.eyJwcm9qZWN0SWQiOiIxMGZmZmRiYi04MTc5LTQxODgtYjZhYS1kYzdmZDA0MDNmOWEiLCJzdWIiOiI4N2Y4MGRkZC02OWM1LTQxNjEtOGI5Yy0xMzE3ZWRlODhkNjkiLCJpc3MiOiJodHRwczovL2FjY2Vzcy10b2tlbi5qd3Qtc2lnbmF0dXJlLnN0YWNrLWF1dGguY29tIiwiaWF0IjoxNzI3NDQ2Nzg5LCJleHAiOjE3Mjc0ODk5ODl9.THomke5jH7VEcFFJM0BBHN7WbELfFsshzOloD5NPMFEwD97Y_aO3xVN7DL_dJT8h3OAYnaOQDa22agQ9LRaUaw",
                    "refresh_token": "waeg20q1q5xs22qghmwncpsr7m2grrm9te6g9chp3dy3r",
                    "user_id": "87f80ddd-69c5-4161-8b9c-1317ede88d69"
                },
                "message": "OK"
            }
        }
    })
    async signUp(@Body(new ValidationPipe()) signupEmailPassswordDto: signUpEmailPassswordDto) {
        try {
            const data = await this.stackAuthService.signUp(signupEmailPassswordDto.email, signupEmailPassswordDto.password, signupEmailPassswordDto.verificationCallbackUrl);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/signInEmailPasssword')
    @ApiOperation({ summary: 'Sign in with email and password' })
    @ApiResponse({
        status: 201,
        description: 'User successfully signed in',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "access_token": "eyJhbGciOiJFUzI1NiJ9.eyJwcm9qZWN0SWQiOiIxMGZmZmRiYi04MTc5LTQxODgtYjZhYS1kYzdmZDA0MDNmOWEiLCJzdWIiOiI1NjdjODZhNS0xNmRkLTQ0YjMtYTE4Yi1hYTk0YzViNzkzNTgiLCJpc3MiOiJodHRwczovL2FjY2Vzcy10b2tlbi5qd3Qtc2lnbmF0dXJlLnN0YWNrLWF1dGguY29tIiwiaWF0IjoxNzI3NDQ3MDg3LCJleHAiOjE3Mjc0OTAyODd9.EjRbNrmu5f5cqVZWkGOcCSiNB9Chp1SGWLNAQ6iR-ZelR0Q7CKqzGpmBSg9SvpJN6QTExqgH4yIchNZR1jc4jQ",
                    "refresh_token": "q91tpewn9he778kxk10j8bsaav5whw7272frntb7fskpr",
                    "user_id": "567c86a5-16dd-44b3-a18b-aa94c5b79358"
                },
                "message": "OK"
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Wrong e-mail or password.',
        schema: {
            example: {
                "status": 400,
                "data": "EMAIL_PASSWORD_MISMATCH",
                "message": "Wrong e-mail or password."
            }
        }
    })
    async signIn(@Body(new ValidationPipe()) signInEmailPassswordDto: signInEmailPassswordDto) {
        try {
            const data = await this.stackAuthService.signIn(signInEmailPassswordDto.email, signInEmailPassswordDto.password);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            console.log();
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/sendResetPasswordCode')
    @ApiOperation({ summary: 'Send reset password code' })
    @ApiResponse({
        status: 201,
        description: 'Reset password code sent ( only if user with e-mail exists )',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "success": "maybe, only if user with e-mail exists"
                },
                "message": "OK"
            }
        }
    })
    async sendResetPasswordCode(@Body(new ValidationPipe()) sendResetPasswordCodeDto: sendResetPasswordCodeDto) {
        try {
            const data = await this.stackAuthService.sendResetPasswordCode(sendResetPasswordCodeDto.email, sendResetPasswordCodeDto.callback_url);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/resetPasswordWithCode')
    @ApiOperation({ summary: 'Reset password with code' })
    @ApiResponse({
        status: 201,
        description: 'Password successfully reset',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "success": true
                },
                "message": "OK"
            }
        }
    })
    async resetPasswordWithCode(@Body(new ValidationPipe()) resetPasswordWithCodeDto: resetPasswordWithCodeDto) {
        try {
            const data = await this.stackAuthService.resetPasswordWithCode(resetPasswordWithCodeDto.password, resetPasswordWithCodeDto.code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/checkResetPasswordCode')
    @ApiOperation({ summary: 'Check reset password code' })
    @ApiBody({
        schema: {
            example: {
                code: 'zf57b82q9xss80dedah0r8p252w3k8ym9wtqhr200z580'
            }
        }
    })
    async checkResetPasswordCode(@Body(new ValidationPipe()) body: { code: string }) {
        try {
            const data = await this.stackAuthService.checkResetPasswordCode(body.code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }


    @ApiTags('SignIn and SignUp')
    @Post('/sendSignInCode')
    @ApiOperation({ summary: 'Send sign-in code' })
    @ApiResponse({
        status: 201,
        description: 'Sign-in code sent',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "success": true
                },
                "message": "OK"
            }
        }
    })
    async sendSignInCode(@Body(new ValidationPipe()) sendSignInCodeDto: sendSignInCodeDto) {
        try {
            const data = await this.stackAuthService.sendSignInCode(sendSignInCodeDto.email, sendSignInCodeDto.callback_url);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/signInWithCode')
    @ApiOperation({ summary: 'Sign in with code' })
    @ApiResponse({
        status: 201,
        description: 'User successfully signed in',
        schema: {
            example: {
                "status": 201,
                "data": {
                    "refresh_token": "6zzs0vzbrha4jwfb54mgx0xzkhst51x6968dza2tz3zn0",
                    "access_token": "eyJhbGciOiJFUzI1NiJ9.eyJwcm9qZWN0SWQiOiIxMGZmZmRiYi04MTc5LTQxODgtYjZhYS1kYzdmZDA0MDNmOWEiLCJzdWIiOiI1NjdjODZhNS0xNmRkLTQ0YjMtYTE4Yi1hYTk0YzViNzkzNTgiLCJpc3MiOiJodHRwczovL2FjY2Vzcy10b2tlbi5qd3Qtc2lnbmF0dXJlLnN0YWNrLWF1dGguY29tIiwiaWF0IjoxNzI3NDQ4Mzk0LCJleHAiOjE3Mjc0OTE1OTR9.qi6i62wxhmKcPH8uIbtmm9OLKHIF19Yx7gxsnxPs6K9kBv81n_2OhX_80X1v-F8G9UU9AQ5z8gpoVT_eF28fjQ",
                    "is_new_user": false,
                    "user_id": "567c86a5-16dd-44b3-a18b-aa94c5b79358"
                },
                "message": "OK"
            }
        }
    })
    async signInWithCode(@Body(new ValidationPipe()) signInWithCodeDto: signInWithCodeDto) {
        try {
            const data = await this.stackAuthService.signInWithCode(signInWithCodeDto.code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('SignIn and SignUp')
    @Post('/checkSignInCode')
    @ApiOperation({ summary: 'Check sign-in code' })
    async checkSignInCode(@Body(new ValidationPipe()) code: string) {
        try {
            const data = await this.stackAuthService.checkSignInCode(code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('User Management')
    @Get('/listUsers')
    @ApiOperation({ summary: 'List users' })
    @ApiResponse({
        status: 200,
        description: 'List of users',
        schema: {
            example: {
                "status": 200,
                "data": {
                    "items": [
                        {
                            "id": "567c86a5-16dd-44b3-a18b-aa94c5b79358",
                            "display_name": null,
                            "primary_email": "nkhiem183@gmail.com",
                            "primary_email_verified": true,
                            "profile_image_url": null,
                            "signed_up_at_millis": 1727434428258,
                            "client_metadata": null,
                            "client_read_only_metadata": null,
                            "server_metadata": null,
                            "has_password": true,
                            "auth_with_email": true,
                            "requires_totp_mfa": false,
                            "oauth_providers": [],
                            "auth_methods": [
                                {
                                    "type": "otp",
                                    "contact_channel": {
                                        "type": "email",
                                        "email": "nkhiem183@gmail.com"
                                    }
                                },
                                {
                                    "type": "password",
                                    "identifier": "nkhiem183@gmail.com"
                                }
                            ],
                            "connected_accounts": [],
                            "selected_team_id": null,
                            "selected_team": null,
                            "last_active_at_millis": 1727449880292
                        }
                    ],
                    "is_paginated": false
                },
                "message": "OK"
            }
        }
    })
    async listUsers() {
        try {
            const data = await this.stackAuthService.listUsers();
            return new ResponseData(
                HttpStatus.OK,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('User Management')
    @Get('/getUser/:userId')
    @ApiOperation({ summary: 'Get user by Id' })
    @ApiResponse({
        status: 200,
        description: 'User successfully retrieved.',
        schema: {
            example: {
                "status": 200,
                "data": {
                    "id": "567c86a5-16dd-44b3-a18b-aa94c5b79358",
                    "display_name": null,
                    "primary_email": "nkhiem183@gmail.com",
                    "primary_email_verified": true,
                    "profile_image_url": null,
                    "signed_up_at_millis": 1727434428258,
                    "client_metadata": null,
                    "client_read_only_metadata": null,
                    "server_metadata": null,
                    "has_password": true,
                    "auth_with_email": true,
                    "requires_totp_mfa": false,
                    "oauth_providers": [],
                    "auth_methods": [
                        {
                            "type": "otp",
                            "contact_channel": {
                                "type": "email",
                                "email": "nkhiem183@gmail.com"
                            }
                        },
                        {
                            "type": "password",
                            "identifier": "nkhiem183@gmail.com"
                        }
                    ],
                    "connected_accounts": [],
                    "selected_team_id": null,
                    "selected_team": null,
                    "last_active_at_millis": 1727457181314
                },
                "message": "OK"
            }
        }
    })
    @ApiParam({ name: 'userId', example: '567c86a5-16dd-44b3-a18b-aa94c5b79358' })
    async getUser(@Param('userId') userId: string) {
        try {
            const data = await this.stackAuthService.getUser(userId);
            return new ResponseData(
                HttpStatus.OK,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('User Management')
    @Delete('/deleteUser/:userId')
    @ApiParam({ name: 'userId', example: '567c86a5-16dd-44b3-a18b-aa94c5b79358' })
    @ApiOperation({ summary: 'Delete user by Id' })
    @ApiResponse({
        status: 200,
        description: 'User successfully deleted',
        schema: {
            example: {
                "status": 200,
                "data": {
                    "success": true
                },
                "message": "OK"
            }
        }
    })
    async deleteUser(@Param('userId') userId: string) {
        try {
            const data = await this.stackAuthService.deleteUser(userId);
            return new ResponseData(
                HttpStatus.OK,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('User Management')
    @Patch('/updateUser/:userId')
    @ApiOperation({ summary: 'Update user by Id' })
    @ApiResponse({
        status: 200,
        description: 'User successfully updated',
        schema: {
            example: {
                "status": 200,
                "data": {
                    "last_active_at_millis": 1727460399738,
                    "server_metadata": {
                        "internalId": "abc123"
                    },
                    "client_read_only_metadata": {
                        "lastLogin": "2023-10-01T12:34:56Z"
                    },
                    "client_metadata": {
                        "theme": "dark",
                        "language": "en"
                    },
                    "connected_accounts": [],
                    "auth_methods": [
                        {
                            "type": "otp",
                            "contact_channel": {
                                "type": "email",
                                "email": "example@gmail.com"
                            }
                        },
                        {
                            "type": "password",
                            "identifier": "example@gmail.com"
                        }
                    ],
                    "oauth_providers": [],
                    "requires_totp_mfa": true,
                    "auth_with_email": true,
                    "has_password": true,
                    "signed_up_at_millis": 1727458719841,
                    "profile_image_url": "https://example.com/profile.jpg",
                    "selected_team_id": null,
                    "selected_team": null,
                    "display_name": "John Doe",
                    "primary_email_verified": true,
                    "primary_email": "example@gmail.com",
                    "id": "2424d894-86bd-43c8-9f43-535f1923041d"
                },
                "message": "OK"
            }
        }
    })
    async updateUser(@Param('userId') userId: string, @Body(new ValidationPipe()) updateUserDto: updateUserDto) {
        console.log(updateUserDto);
        try {
            const data = await this.stackAuthService.updateUser(userId, updateUserDto);
            return new ResponseData(
                HttpStatus.OK,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('Email Verification')
    @Post('/sendVerifyEmail') 
    @ApiOperation({ summary: 'Send verify email' })
    async sendVerifyEmail(@Body(new ValidationPipe()) sendEmailVerificationCodeDto: sendEmailVerificationCodeDto) {
        try {
            const data = await this.stackAuthService.sendEmailVerificationCode(sendEmailVerificationCodeDto.email, sendEmailVerificationCodeDto.callback_url);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            console.log(123);
            console.log(error.response.data.details)
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('Email Verification')
    @Post('/verifyEmail')
    @ApiOperation({ summary: 'Verify email' })
    async verifyEmail(@Body(new ValidationPipe()) code: string) {
        try {
            const data = await this.stackAuthService.verifyEmail(code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('Email Verification')
    @Post('/checkEmailVerificationCode') 
    @ApiOperation({ summary: 'Check email verification code' })
    async checkEmailVerificationCode(@Body(new ValidationPipe()) code: string) {
        try {
            const data = await this.stackAuthService.checkEmailVerificationCode(code);
            return new ResponseData(
                HttpStatus.CREATED,
                data,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData(
                error.status,
                error.response.data.code,
                error.response.data.error
            );
        }
    }

    @ApiTags('OAuth')
    @Get('/OAuthAuthorizeEndpoint/:provide_id')
    @ApiOperation({ summary: 'Get OAuth authorize endpoint' })
    async OAuthAuthorizeEndpoint(@Param('provide_id') provide_id: string, @Res() res: Response) {
        try {
            const data = await this.stackAuthService.OAuthAuthorizeEndpoint(provide_id);
            res.status(200).send(data); // Assuming data is HTML content
        } catch (error) {
            res.status(error.status).send({
                code: error.response.data.code,
                error: error.response.data.error
            });
        }
    }
}