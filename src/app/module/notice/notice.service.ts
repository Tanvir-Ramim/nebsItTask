import { TNotice } from './notice.interface'

const createNoticeService = async (allNoticeData: TNotice) => {
    console.log(allNoticeData);  

}

export const NoticeServices = {
  createNoticeService,
}
