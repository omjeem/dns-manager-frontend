import {atom} from "recoil"

interface DomainData {
    id : string,
    name : string,
    description : string,
    resourceRecordSetCount : number
}

interface ResourceRecordType {
    Value: String
}
interface Record {
    Name: String,
    Type: String,
    TTL: String,
    ResourceRecords: ResourceRecordType[]
}

export const domainData = atom<DomainData[]>({
    key : 'domainData',
    default:[]
})

export const recordData = atom<Record[]>({
    key : 'recordData',
    default:[]
})