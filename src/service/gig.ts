import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetAllGigsParams, GetAllGigsResponse, GetOneGigResponse,  } from "../types";
import api from "./axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// hizmetler ile alakalı bütün api istekleri
 const gigService = {
    getAll:(params?: GetAllGigsParams) => api.get <GetAllGigsResponse>("/gigs", {params} ),
    getOne:(id: string) => api.get<GetOneGigResponse>(`/gigs/${id}`),
    create:( body:FormData) => api.post<GetOneGigResponse> (`/gigs`,body),
    delete:(id:string) => api.delete(`/gigs/${id}`),
};

// bütün hizmetleri al

const useGetAllGigs = (params: GetAllGigsParams) => 
    useQuery({ 
        //! api den gelen cevabın state ini yönetmeye yarar
        queryKey: ["gigs",params],
        queryFn: () => gigService.getAll(params),
        select:(res) => res.data.gigs,
        
    })

    // bir hizmeti al 
    const usegetOneGig = (id:string) => 
        useQuery({
            queryKey:["gig"],
            queryFn:() => gigService.getOne(id),
            select: (res) => res.data.gig,
        })

        // yeni hizmet oluştur 
        // //! GET HARİCİ İSTEKERDE MUTATION VE YÖNLENDİRME VS DE YAPILABİLDİĞİ İÇİN MUTATIONDA RETURN KULLANDIK
        const useCreateGig = () => {
            const navigate=useNavigate();


            return useMutation({
                mutationKey:["createGig"],
                mutationFn:(body:FormData) => gigService.create(body),
                onSuccess: (res) => {
                    navigate(`/detail/${res.data.gig._id}`);
                    toast.success("Hizmet başarıyla oluşturuldu ")
                },
                onError(error) {
                    console.log(error);
                    toast.error("Hizmet oluşturulurken bir sorun oluştu" );
                },
            });
        };

        // hizmeti kaldır

        const useDeleteGig = (id:string) => {
            const client = useQueryClient()
            return useMutation({
                mutationKey:["deleteGig"],
                mutationFn:() => gigService.delete(id),
                onSuccess:() => {
                    toast.success("Hizmet başarıyla kaldırıldı");
                    // usegetallgigs api isteğini tekrarla
                    client.invalidateQueries({queryKey:["gigs"] })
                },
                onError:(error) => {
                    console.log(error);
                    toast.error("Hizmet kaldırılırken bir sorun oluştu")
                }
            })
        }

        export {gigService,useGetAllGigs,usegetOneGig,useCreateGig,useDeleteGig}