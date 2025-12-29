'use client';

import { useState, useEffect } from 'react';
import {
    User,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        // Firebase가 초기화되지 않은 경우
        if (!auth) {
            setAuthState({
                user: null,
                loading: false,
                error: 'Firebase가 초기화되지 않았습니다. 환경 변수를 확인하세요.',
            });
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({
                user,
                loading: false,
                error: null,
            });
        });

        return () => unsubscribe();
    }, []);

    // 구글 로그인
    const signInWithGoogle = async () => {
        if (!auth) {
            throw new Error('Firebase가 초기화되지 않았습니다.');
        }

        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '구글 로그인 실패';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            throw error;
        }
    };

    // 이메일/비밀번호 로그인
    const signInWithEmail = async (email: string, password: string) => {
        if (!auth) {
            throw new Error('Firebase가 초기화되지 않았습니다.');
        }

        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '로그인 실패';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            throw error;
        }
    };

    // 회원가입
    const signUpWithEmail = async (email: string, password: string) => {
        if (!auth) {
            throw new Error('Firebase가 초기화되지 않았습니다.');
        }

        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '회원가입 실패';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            throw error;
        }
    };

    // 로그아웃
    const logout = async () => {
        if (!auth) {
            throw new Error('Firebase가 초기화되지 않았습니다.');
        }

        try {
            await signOut(auth);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '로그아웃 실패';
            setAuthState(prev => ({ ...prev, error: errorMessage }));
            throw error;
        }
    };

    return {
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
    };
}
