export type  task={
_id:string,
title:string,
completed:boolean,
description:string,
category: 'Work' | 'Personal' | 'Shopping';
}