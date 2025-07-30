import { NextResponse } from 'next/server';
import { CountService } from '@/domain/count';
import {
    GetCounterResponse,
    IncrementCounterResponse
} from '@/inter-env/count/contract';
import { serviceRegistry } from '@/domain/shared/serviceRegistry';


// GET /api/counter
export async function GET(): Promise<NextResponse<GetCounterResponse>> {
    try {
        // Try to get counter (will be null if none exists)
        let counter = await serviceRegistry.countService.getCount();

        // If no counter exists, create one
        if (!counter) {
            counter = await serviceRegistry.countService.createCount({ count: 0 });
        }

        return NextResponse.json({
            success: true,
            data: counter
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: null as any,
                error: (error as Error).message
            },
            { status: 500 }
        );
    }
}

// POST /api/counter - increment the counter
export async function POST(): Promise<NextResponse<IncrementCounterResponse>> {
    try {
        const counter = await serviceRegistry.countService.incrementCount();
        return NextResponse.json({
            success: true,
            data: counter
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: null as any,
                error: (error as Error).message
            },
            { status: 500 }
        );
    }
}