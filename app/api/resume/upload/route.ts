import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { Resume } from '@/types/Resume';
import { NextRequest, NextResponse } from 'next/server';
import { FileUpload } from '@/lib/uploadAws';


type RequestBody = {
    userId: string;
    resume: Resume;
    resumeFileId?: string;
}

export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const file = formData.getAll('file') as File[];
    const resumeFile = file[0];
    const fileName = resumeFile.name;
    const fileType = resumeFile.type;
    const userId = formData.get('userId') as string;

    const fileUpload = new FileUpload();
    const response:any = await fileUpload.uploadAws(userId, resumeFile, userId);
    if(response.awsUrl){
        // send it to the Python Function to extract the resume
    }



    if (!file || !fileName || !fileType || !userId) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    const { resume, resumeFileId } = await req.json() as RequestBody;
    try {
        const response = await updateOrCreateResumeByUserId(userId, resume, resumeFileId);
        return NextResponse.json({message: 'Resume uploaded successfully', data: response}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  
}