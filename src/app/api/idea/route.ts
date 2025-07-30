import { serviceRegistry } from "@/domain/shared/serviceRegistry";
import { CreateIdeaParams, CreateIdeaResponse, DeleteIdeaResponse, GetIdeasResponse } from "@/shared/contracts/idea/contracts";
import { NextResponse } from "next/server";


// GET api/idea
export async function GET(): Promise<NextResponse<GetIdeasResponse>> {
    try {
        const ideas = await serviceRegistry.ideaService.getIdeas();
        return NextResponse.json({
            success: true,
            data: ideas
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null as any,
            error: (error as Error).message
        },
            { status: 500 }
        );
    }
}

// POST api/idea
export async function POST(request: Request): Promise<NextResponse<CreateIdeaResponse>> {
    try {
        const ideaData: CreateIdeaParams = await request.json();
        const newIdea = await serviceRegistry.ideaService.createIdea(ideaData);
        return NextResponse.json({
            success: true,
            data: newIdea
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null as any,
            error: (error as Error).message
        },
            { status: 500 }
        );
    }

}

// DELETE api/idea/[id]
export async function DELETE(
    { params }: { params: { id: string } }
): Promise<NextResponse<DeleteIdeaResponse>> {
    try {
        const id = params.id;
        await serviceRegistry.ideaService.removeIdea(id);

        return NextResponse.json({
            success: true,
            data: null as any,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null as any,
            error: (error as Error).message
        }, { status: 500 });
    }
}