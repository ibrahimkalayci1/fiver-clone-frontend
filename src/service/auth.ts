import api from "./axios";
import type {AuthResponse,ILoginData,IRegisterData,} from "../types"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const authService={
    login: (body:ILoginData) => api.post<AuthResponse>("/auth/login", body) ,
    register: (body:IRegisterData) => 
        api.post<AuthResponse>("/auth/register", body, { headers: { //! headers ekledik api ye json verisi değiş multipart form data verisi göneriyrm
        "Content-Type" : "multipart/form-data" } } ) ,
    logout:() => api.post("/auth/logout"),
    profile:() =>api.get<AuthResponse>("/auth/profile"),
}




//! TANSTACKTE GET İSTEKLERİ İÇİN USW QUERY DİĞERLERİ İÇİN MUTATION


//login istekleri için lullanacagımız mutasyon
export const useLogin = () => {
        const navigate= useNavigate()
        const client = useQueryClient()
    return useMutation({
        mutationKey:["login"],
        mutationFn:authService.login,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["profile"]}) //! 2.adım çıkış yapınca profile verilerini tekrar çek

            navigate("/");
            toast.success("Oturumunuz Açıldı")
        },
        onError:() => {
            toast.error("Giriş yapma işleminde bir hata Oluştu")
        }
    })
}


 // axios.interceptors.response((res) => {
  //  res.status===404 ? axios.get()
// } )


//register istekleri için lullanacagımız mutasyon

export const useRegister = () => {
    const navigate= useNavigate()
    return useMutation({
        mutationKey:["register"],
        mutationFn:authService.register,
        onSuccess: () => {
            navigate("/login");
            toast.success("Hesabınız Oluşturuldu. Giriş Yapabilirsiniz")
        },
        onError:() => {
            toast.error("Kaydolma işleminde bir hata Oluştu")
        }
    })
}

//logout istekleri için lullanacagımız mutasyon
export const useLogout = () => {
    const navigate=useNavigate();
    const client = useQueryClient() //! 1.adım çıkış yapınca profile verilerini tekrar çek

    return useMutation({
        mutationKey:["logout"],
        mutationFn:authService.logout,
        onSuccess: () => {

            const resetQueriesToUndefined = () => {
                client.getQueryCache()
                .findAll({queryKey: ["profile"] })
                .forEach((query) =>query.setData(undefined) );
                client.invalidateQueries({queryKey:["profile"]});
            }
            resetQueriesToUndefined()
             //! 2.adım çıkış yapınca profile verilerini tekrar çek
            navigate("/login");
            toast.success("Oturumunuz Kapandı")
        },
        onError:() => {
            toast.error("Çıkış Yapma işleminde bir hata Oluştu")
        }
    })
}
// profile isteği için kullanacağımız query
export const useProfile =  () => {
    const {isLoading,error,data} = useQuery({

     queryKey:["profile"],
        queryFn:authService.profile,
        staleTime:0,
        select:(res) => res.data.user,
        retry:false
    });
    
return {isLoading,error,user:data};
}
    
        
    
