import jwt from 'jsonwebtoken';

// معرف التطبيق والمفتاح السري
const APP_NAME = 'TownMediaAgent';
const TOKEN_KEY = `${APP_NAME}_token`;
const USER_KEY = `${APP_NAME}_user`;
const REFRESH_TOKEN_KEY = `${APP_NAME}_refresh_token`;

// إدارة التوكن
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

// إدارة الريفريش توكن
export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// إدارة بيانات المستخدم
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;

  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeCurrentUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
};

// التحقق من صحة التوكن
export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return false;

    // التحقق من انتهاء صلاحية التوكن
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// التحقق من حالة المصادقة
export const isAuthenticated = () => {
  const token = getAuthToken();
  return token && isTokenValid(token);
};

// التحقق من صلاحيات الإدارة
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && (user.role === 'admin' || user.isAdmin === true);
};

// تسجيل الدخول
export const login = async (credentials) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'فشل في تسجيل الدخول');
    }

    // حفظ البيانات
    if (data.token) {
      setAuthToken(data.token);
    }

    if (data.refreshToken) {
      setRefreshToken(data.refreshToken);
    }

    if (data.user) {
      setCurrentUser(data.user);
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
      message: data.message || 'تم تسجيل الدخول بنجاح',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'حدث خطأ أثناء تسجيل الدخول',
    };
  }
};

// تسجيل حساب جديد
export const register = async (userData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'فشل في إنشاء الحساب');
    }

    // حفظ البيانات إذا تم تسجيل الدخول تلقائياً
    if (data.token) {
      setAuthToken(data.token);
    }

    if (data.user) {
      setCurrentUser(data.user);
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
      message: data.message || 'تم إنشاء الحساب بنجاح',
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      message: error.message || 'حدث خطأ أثناء إنشاء الحساب',
    };
  }
};

// تسجيل الخروج
export const logout = async () => {
  try {
    const token = getAuthToken();

    if (token) {
      // إرسال طلب تسجيل الخروج للخادم
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // مسح البيانات المحلية
    removeAuthToken();
    removeRefreshToken();
    removeCurrentUser();
  }
};

// تحديث التوكن
export const refreshAuthToken = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('لا يوجد رمز تحديث');
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'فشل في تحديث التوكن');
    }

    // حفظ التوكن الجديد
    if (data.token) {
      setAuthToken(data.token);
    }

    if (data.refreshToken) {
      setRefreshToken(data.refreshToken);
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    console.error('Token refresh error:', error);

    // في حالة فشل التحديث، تسجيل الخروج
    logout();

    return {
      success: false,
      message: error.message || 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى',
    };
  }
};

// إنشاء رؤوس المصادقة
export const getAuthHeaders = () => {
  const token = getAuthToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// دالة لإجراء طلبات HTTP محمية
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();

  if (!token || !isTokenValid(token)) {
    // محاولة تحديث التوكن
    const refreshResult = await refreshAuthToken();

    if (!refreshResult.success) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }
  }

  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // إذا كان الرد 401، محاولة تحديث التوكن
  if (response.status === 401) {
    const refreshResult = await refreshAuthToken();

    if (refreshResult.success) {
      // إعادة المحاولة مع التوكن الجديد
      const newHeaders = {
        ...getAuthHeaders(),
        ...options.headers,
      };

      return fetch(url, {
        ...options,
        headers: newHeaders,
      });
    } else {
      throw new Error('انتهت صلاحية الجلسة');
    }
  }

  return response;
};

// التحقق من قوة كلمة المرور
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);

  const errors = [];

  if (password.length < minLength) {
    errors.push(`كلمة المرور يجب أن تكون ${minLength} أحرف على الأقل`);
  }

  if (!hasUpperCase) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل');
  }

  if (!hasLowerCase) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل');
  }

  if (!hasNumbers) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
  }

  if (!hasNonalphas) {
    errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل');
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: [hasUpperCase, hasLowerCase, hasNumbers, hasNonalphas].filter(Boolean).length,
  };
};

// التحقق من صحة البريد الإلكتروني
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// إدارة الجلسة
export const setupAuthInterceptor = () => {
  // التحقق من صلاحية التوكن كل دقيقة
  setInterval(() => {
    const token = getAuthToken();

    if (token && !isTokenValid(token)) {
      refreshAuthToken();
    }
  }, 60000); // 60 ثانية
};

// تنظيف البيانات المحلية عند إغلاق المتصفح
export const setupStorageCleanup = () => {
  window.addEventListener('beforeunload', () => {
    const user = getCurrentUser();

    // الاحتفاظ بالبيانات إذا اختار المستخدم "تذكرني"
    if (!user?.rememberMe) {
      logout();
    }
  });
};

export default {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  isAuthenticated,
  isAdmin,
  login,
  register,
  logout,
  refreshAuthToken,
  authenticatedFetch,
  validatePassword,
  validateEmail,
  setupAuthInterceptor,
  setupStorageCleanup,
};
