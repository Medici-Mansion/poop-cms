'use client';
import { Avatar, AvatarFallback } from 'components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">신고해요</p>
          <p className="text-sm text-muted-foreground">2024.06.01</p>
        </div>
        <div className="ml-auto font-medium">욕설</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">신고해요</p>
          <p className="text-sm text-muted-foreground">2024.06.01</p>
        </div>
        <div className="ml-auto font-medium">욕설</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">신고해요</p>
          <p className="text-sm text-muted-foreground">2024.06.01</p>
        </div>
        <div className="ml-auto font-medium">욕설</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">신고해요</p>
          <p className="text-sm text-muted-foreground">2024.06.01</p>
        </div>
        <div className="ml-auto font-medium">욕설</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">신고해요</p>
          <p className="text-sm text-muted-foreground">2024.06.01</p>
        </div>
        <div className="ml-auto font-medium">욕설</div>
      </div>
    </div>
  );
}
