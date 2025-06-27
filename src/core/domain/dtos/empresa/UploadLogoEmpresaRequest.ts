import { AttachBase64Dto } from "../common/AttachBase64Dto";

export interface UploadLogoEmpresaRequest{
    empresaId: number,
    logo: AttachBase64Dto
}