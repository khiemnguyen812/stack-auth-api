import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StackAuthService {
    private headers = {
        'X-Stack-Access-Type': 'server',
        'X-Stack-Project-Id': '10fffdbb-8179-4188-b6aa-dc7fd0403f9a',
        'X-Stack-Publishable-Client-Key': 'pck_w8fsw5q7zep9mssz63wzs8jsnzdxx9jrmn0dbka80hvc8',
        'X-Stack-Secret-Server-Key': 'ssk_x0ybdta0zckxkgqnyr7axga3n6xe22fjznvbxarm9nzwr',
        'Content-Type': 'application/json'
    };

    private headersWithoutContentType = {

        'X-Stack-Access-Type': 'server',
        'X-Stack-Project-Id': '10fffdbb-8179-4188-b6aa-dc7fd0403f9a',
        'X-Stack-Publishable-Client-Key': 'pck_w8fsw5q7zep9mssz63wzs8jsnzdxx9jrmn0dbka80hvc8',
        'X-Stack-Secret-Server-Key': 'ssk_x0ybdta0zckxkgqnyr7axga3n6xe22fjznvbxarm9nzwr',
    };
    async signUp(email: string, password: string, verification_callback_url: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/password/sign-up',
                { email, password, verification_callback_url },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    async signIn(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/password/sign-in',
                { email, password },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    async sendResetPasswordCode(email: string, callback_url: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/password/send-reset-code',
                { email, callback_url },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending reset password code:', error);
            throw error;
        }
    }
    async resetPasswordWithCode(password: string, code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/password/reset',
                { password, code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }

    async checkResetPasswordCode(code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/password/reset/check-code',
                { code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error checking reset password code:', error);
            throw error;
        }
    }

    async sendSignInCode(email: string, callback_url: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/otp/send-sign-in-code',
                { email, callback_url },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending sign in code:', error);
            throw error;
        }
    }

    async signInWithCode(code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/otp/sign-in',
                { code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error signing in with code:', error);
            throw error;
        }
    }

    async checkSignInCode(code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/auth/otp/sign-in/check-code',
                { code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error checking sign in code:', error);
            throw error;
        }
    }
    
    async listUsers(): Promise<any> {
        try {
            const response = await axios.get(
                'https://api.stack-auth.com/api/v1/users',
                { headers: this.headersWithoutContentType }
            );
            return response.data;
        } catch (error) {
            console.error('Error listing users:', error);
            throw error;
        }
    }

    async getUser(userId: string): Promise<any> {
        try {
            const response = await axios.get(
                `https://api.stack-auth.com/api/v1/users/${userId}`,
                { headers: this.headersWithoutContentType }
            );
            return response.data;
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            const response = await axios.delete(
                `https://api.stack-auth.com/api/v1/users/${userId}`,
                { headers: this.headersWithoutContentType }
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async updateUser(userId: string, data: any): Promise<any> {
        try {
            const response = await axios.patch(
                `https://api.stack-auth.com/api/v1/users/${userId}`,
                data,
                { headers: this.headersWithoutContentType }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async sendEmailVerificationCode(email: string, callback_url: string): Promise<any> {
        try {
            const response = await axios.post(
               'https://api.stack-auth.com/api/v1/contact-channels/send-verification-code',
                { email, callback_url },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending email verification code:', error);
            throw error;
        }
    }

    async verifyEmail(code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/contact-channels/verify',
                { code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }

    async checkEmailVerificationCode(code: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.stack-auth.com/api/v1/contact-channels/verify/check-code',
                { code },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error checking email verification code:', error);
            throw error;
        }
    }

    async OAuthAuthorizeEndpoint(provider_id:string) : Promise<any>{
        const type = 'authenticate';
        const token = 'your_token';
        const provider_scope = 'email profile';
        const error_redirect_uri = 'https://yourapp.com/error';
        const after_callback_redirect_url = 'https://yourapp.com/after-callback';
        const client_id = '10fffdbb-8179-4188-b6aa-dc7fd0403f9a';
        const client_secret = 'pck_w8fsw5q7zep9mssz63wzs8jsnzdxx9jrmn0dbka80hvc8';
        const redirect_uri = 'https://api.stack-auth.com/api/v1/auth/oauth/callback/google';
        const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile email profile';
        const state = '';
        const grant_type = 'authorization_code';
        const code_challenge = '';
        const code_challenge_method = 'S256';
        const response_type = 'code';
        try {
            const response = await axios.get(
                `https://api.stack-auth.com/api/v1/auth/oauth/authorize/${provider_id}`,
                {
                    headers: this.headersWithoutContentType,
                    params: {
                        type,
                        token,
                        provider_scope,
                        error_redirect_uri,
                        after_callback_redirect_url,
                        client_id,
                        client_secret,
                        redirect_uri,
                        scope,
                        state,
                        grant_type,
                        code_challenge,
                        code_challenge_method,
                        response_type
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error getting OAuth authorize endpoint:', error);
            throw error;
        }
    }

}