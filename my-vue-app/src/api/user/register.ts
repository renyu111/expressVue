import request from '@/util/request';

export default function register(data: any) {
    return request({
        url: '/login/register',
        method: 'post',
        data
    })
}

