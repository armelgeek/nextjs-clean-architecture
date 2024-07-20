"use client";
import { useController } from '@data-client/react';
import { memo, useCallback } from 'react';
import {CreateTodo} from "@/domain/todo/usecases/todo/createTodo";

export default function NewTodo() {
    const usecase = new CreateTodo();
    const handlePress = useCallback(
        async (e: any) => {
            if (e.key === 'Enter') {
                await usecase.execute({
                    userId: 1,
                    title: e.target.value,
                    completed: false
                });
                e.target.value = '';
            }
        },
        [],
    );

    return (
        <div className="bg-blue-800 w-full h-full">
            <input type="checkbox" name="new" checked={false} disabled />{' '}
            <input type="text" className='border' onKeyDown={handlePress} />
        </div>
    );
}
