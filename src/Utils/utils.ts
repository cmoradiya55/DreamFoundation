export const cx = (...classes:string[]) => classes.filter(Boolean).join(' ');
export const fontSizeClasses = {
    'medium': 'text-md', //0.75rem  
    'normal': 'text-base', // 1rem
    'default': 'text-lg', // 1.125rem
    'base': 'text-base', // 1rem
    'xs': 'text-xs', // 0.75rem
    'sm': 'text-sm', // 0.875rem
    'lg': 'text-lg', // 1.125rem
    'xl': 'text-xl', // 1.25rem
    '2xl': 'text-2xl', // 1.5rem
    '3xl': 'text-3xl', // 1.875rem
    '4xl': 'text-4xl', // 2.25rem
    '5xl': 'text-5xl', // 3rem
    '6xl': 'text-6xl', // 4rem
    '7xl': 'text-7xl', // 5rem
    '8xl': 'text-8xl', // 6rem
    '9xl': 'text-9xl', // 7rem
    '10xl': 'text-10xl', // 8rem
};
